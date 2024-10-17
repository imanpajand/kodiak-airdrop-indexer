import { assertNotNull, DataHandlerContext } from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";
import { In } from "typeorm";
import { Account, Bundle } from "../model";

export function* splitIntoBatches<T>(
    list: T[],
    maxBatchSize: number
): Generator<T[]> {
    if (list.length <= maxBatchSize) {
        yield list;
    } else {
        let offset = 0;
        while (list.length - offset > maxBatchSize) {
            yield list.slice(offset, offset + maxBatchSize);
            offset += maxBatchSize;
        }
        yield list.slice(offset);
    }
}

export interface EntityClass<T extends Entity> {
    new (): T;
}

export interface Entity {
    id: string;
}

export class EntityManager {
    private static accounts: Map<string, Account> = new Map<string, Account>();
    private static bunldes: Map<string, Bundle> = new Map<string, Bundle>();

    private deferredIds = new Map<EntityClass<Entity>, Set<string>>();
    private cache = new Map<EntityClass<any>, Map<string, any>>();

    constructor(private store: Store) {}

    defer<T extends Entity>(entity: EntityClass<T>, ...ids: string[]) {
        let set = this.deferredIds.get(entity);
        if (set == null) {
            set = new Set();
            this.deferredIds.set(entity, set);
        }

        let cache = this.getCache(entity);
        for (const id of ids) {
            if (!cache.has(id)) set.add(id);
        }
        return this;
    }

    async load<T extends Entity>(entity: EntityClass<T>) {
        const fetched = new Map<string, T>();

        const cache = this.getCache(entity);

        const ids = this.deferredIds.get(entity);
        if (!ids || ids.size == 0) return fetched;

        for (const idBatch of splitIntoBatches([...ids], 1000))
            await this.store
                .findBy(entity, { id: In(idBatch) } as any)
                .then((es) =>
                    es.forEach((e) => {
                        cache.set(e.id, e);
                        fetched.set(e.id, e);
                    })
                );
        ids.clear();

        return fetched;
    }

    get<T extends Entity>(
        entity: EntityClass<T>,
        id: string
    ): Promise<T | undefined>;
    get<T extends Entity>(
        entity: EntityClass<T>,
        id: string,
        search: false
    ): T | undefined;
    get<T extends Entity>(
        entity: EntityClass<T>,
        id: string,
        search = true
    ): Promise<T | undefined> | (T | undefined) {
        const cache = this.getCache(entity);
        let value = cache.get(id);
        if (search) {
            return value != null
                ? new Promise((resolve) => resolve(value))
                : this.store.get(entity, id).then((e) => {
                      if (e) cache.set(e.id, e);
                      return e;
                  });
        } else {
            return value;
        }
    }

    getOrFail<T extends Entity>(entity: EntityClass<T>, id: string): Promise<T>;
    getOrFail<T extends Entity>(
        entity: EntityClass<T>,
        id: string,
        search: false
    ): T;
    getOrFail<T extends Entity>(
        entity: EntityClass<T>,
        id: string,
        search = true
    ): Promise<T> | T {
        if (search) {
            return this.get(entity, id).then((e) => assertNotNull(e));
        } else {
            return assertNotNull(this.get(entity, id, search));
        }
    }

    add<T extends Entity>(entity: T) {
        this.getCache(entity.constructor as EntityClass<T>).set(
            entity.id,
            entity
        );
        return this;
    }

    values<T extends Entity>(entity: EntityClass<T>) {
        return [...this.getCache(entity).values()];
    }

    private getCache<T extends Entity>(entity: EntityClass<T>) {
        if (entity.name === "Account") {
            return EntityManager.accounts;
        }
        if (entity.name === "Bundle") {
            return EntityManager.bunldes;
        }
        let value = this.cache.get(entity);
        if (value == null) {
            value = new Map();
            this.cache.set(entity, value);
        }
        return value;
    }
}
