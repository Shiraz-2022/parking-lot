import type {FindRepository} from "./find.repository.ts";
import type {CreateRepository} from "./create.repository.ts";
import type {DeleteRepository} from "./delete.repository.ts";
import type {UpdateRepository} from "./update.repository.ts";

export interface BaseRepository<T> extends FindRepository<T>, CreateRepository<T>, UpdateRepository<T>, DeleteRepository<T> {}