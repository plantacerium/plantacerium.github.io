---
title: Ollama and Continue Dev
---

# AI local assistant

## Links Resources
* [Ollama](https://ollama.com)
* [Continue](https://continue.dev)

## Ollama install
````bash
curl -fsSL https://ollama.com/install.sh | sh
````

## Continue dev, vs code plugin
````bash
ollama run models
ollama run llama3:8b
ollama pull nomic-embed-text
````

## Configuration file for continue dev
````json
  "models": [
    {
      "title": "Llama 3 8B",
      "provider": "ollama",
      "model": "llama3:8b"
    }
  ],
  "tabAutocompleteModel": {
    "title": "Llama 3 8B",
    "provider": "ollama",
    "model": "llama3:8b"
  },
    "embeddingsProvider": {
    "provider": "ollama",
    "model": "nomic-embed-text"
  }
````

Note: I prefer to use it for small non code tasks or very basic boilerplate.
