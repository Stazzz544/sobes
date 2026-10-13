import type { ru } from './ru';

export type Dictionary = typeof ru;

type JoinPath<Prefix extends string, Key extends string> = Prefix extends '' ? Key : `${Prefix}.${Key}`;

type LeafPaths<Node, Prefix extends string = ''> = {
  [Key in keyof Node & string]: Node[Key] extends string
    ? JoinPath<Prefix, Key>
    : Node[Key] extends readonly unknown[]
      ? never
      : LeafPaths<Node[Key], JoinPath<Prefix, Key>>;
}[keyof Node & string];

export type TranslationKey = LeafPaths<Omit<Dictionary, 'plurals'>>;

export type PluralKey = keyof Dictionary['plurals'];
