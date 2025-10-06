---
title: Rust Best Practices
---

* Use pattern matching with match for enums. (Prevent bugs).
* Use Option and Result types for predictable error handling. (Code safety).
* Use iter,map, filter for data processing. (Inmutability).
* Use enum for types with variants. (Type safety).
* Use trait for shared behaviour in different types. (Polymorphism).
* Use descriptive names that communicate actions and results as with verb_name_details. (Scale codebase and team work).
* Use snake_case for variables and functions. (Readability).
* Use prefix for booleans with is, has, can. (Consistency across environments).
* Use const, static for inmutability with capital letters. (Consistency).
* Use complete words and don't use abbreviations. (Teamwork).
* Declare variables with clear different names. (Maintanability).
* Define name conventions for your codebase that respect the language conventions. (Adaptability).
* Use impl to group methods for a type. (Encapsulation).
* Use From and Into for types conversions. (Flexibility).
* Use std::borrow:Cow to handle borrowed and owned data. (Clone on Write, useful for Performance).
* Use std::rc::Rc for reference counting. (Single thread).
* Use std::sync::Arc for atomic references. (Multi thread).
* Use std::cell:RefCell for mutability in single thread. (Mutable borrows).
* Use std::sync::{Arc, Mutex} for thread safe interior mutability. (Prevents data races).
* Create clear documentation. (Teamwork).
* Use triple slash for API documentation. (Automation enabler).
* Update comments when the commented part change. (Consistency).
* Comment only when explanation add value and answer why? complex questions. (Only useful depencencies).
* Use TODO comment as a flag to review later. (Code reviews).
* Use ? for readable error propagation. (Error handling).
* Use async and await for asynchronous code. (Operations).
* Use for loops to iterate over collections. (Safer operations).
