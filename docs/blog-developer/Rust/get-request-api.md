---
title: Get Request
---

```toml
// cargo.toml
reqwest = { version = "0.10", features = ["blocking", "json"]}
error_chain = "0.12.4"
```

```rust
// main.rs
use error_chain::error_chain;
use std::io::Read;

error_chain! {
    foreign_links{
        Io(std::io::Error);
        HttpRequest(reqwest::Error);
    }
}

fn main() -> Result<()> {
    let mut res = reqwest::blocking::get("http://httpbin.org/get")?;
    let mut body = String::new();
    res.read_to_string(&mut body)?;

    println!("Status :{}", res.status());
    println!("Headers :{#:?}", res.headers());
    println!("Body :{}", body);
    Ok(());
}
```


```bash
// script.sh
cargo build
cargo run
```