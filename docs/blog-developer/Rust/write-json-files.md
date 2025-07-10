---
title: Write JSON Files
---

```toml
// cargo.toml
serde_json = "1.0"
serde = { version = "1.0", features = ["derive"]}
```
```rust
// main.rs
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Paragraph {
    name: String
}

#[derive(Serialize, Deserialize)]
struct Article {
    article: String,
    author: String,
    paragraph: Vec<Paragraph>
}
fn main() {
    let article: Article = Article{
        article: String:from("how to work with json in rust"),
        author: String::from("Pulsar"),
        paragraph: vec![
            Paragraph {
                name: String::from("starting sentence")
            },
            Paragraph {
                name: String::from("body of the paragraph")
            },  
            Paragraph {
                name: String::from("end of the paragraph")
            }      
        ]
    };

    let json = serde_json::to_string(&article).unwrap();
    println!("The json is : {}", json);
}
```


```bash
// script.sh
cargo build
cargo run
```