---
title: Read JSON Files
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
    let json = r#"
    {
        "article": "how to work with json in rust",
        "author": "Pulsar",
        "paragraph": [
            {
                "name": "starting sentence"
            },
            {
                "name": "body of the paragraph"
            },  
            {
                "name": "end of the paragraph"
            }      
        ]
    }
    "#;

    let parsed: Article = read_json_typed(json);
    println!("The name of the first paragraph is : {}", parsed.paragraph[0].name);
}

fn read_json_typed(raw_json: &str) -> Article {
    let parsed: Article = serde_json::from_str(raw_json).unwrap();
    return parsed;
}
```


```bash
// script.sh
cargo build
cargo run
```