import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type CountdownMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TodoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Countdown {
  readonly id: string;
  readonly end_date?: string | null;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Countdown, CountdownMetaData>);
  static copyOf(source: Countdown, mutator: (draft: MutableModel<Countdown, CountdownMetaData>) => MutableModel<Countdown, CountdownMetaData> | void): Countdown;
}

export declare class Todo {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Todo, TodoMetaData>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo, TodoMetaData>) => MutableModel<Todo, TodoMetaData> | void): Todo;
}