/**
 * Understanding generics in typescript with react
 * What are Generics?
 * 
Generics in TypeScript allow us to create reusable and flexible components, functions, and classes that can work with multiple data types while ensuring type safety. Instead of defining functions or components for each type separately, we use generics to write a single implementation that works with various types.


 * 
*/

// 1. Understanding Generics with Functions
// Basic Example
// Without generics, we would write multiple functions for different data types:

function identityNumber(arg: number): number {
  return arg;
}

function identityString(arg: string): string {
  return arg;
}
// With generics, we create a single function that works with any type:

function identity<T>(arg: T): T {
  return arg;
}

// Usage
const numResult = identity<number>(10); // Works with number
const strResult = identity<string>("Hello TypeScript!"); // Works with string
// Here, <T> is a type parameter that acts as a placeholder for a real type that we provide when calling the function.

// Generics with Arrays
// If we want a function that works with arrays:

function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

// Usage
const firstNumber = getFirstElement<number>([1, 2, 3, 4]); // 1
const firstString = getFirstElement<string>(["apple", "banana", "cherry"]); // "apple"

// 2. Generics with Interfaces
// We can use generics in interfaces to make them reusable.

interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

const numberPair: KeyValuePair<number, string> = { key: 1, value: "One" };
const stringPair: KeyValuePair<string, boolean> = {
  key: "isCompleted",
  value: true,
};
const numberPair2: KeyValuePair<string, string> = { key: "hello", value: "hi" };
