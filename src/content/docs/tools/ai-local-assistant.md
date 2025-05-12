---
title: Ollama and Continue Dev
---

# AI local assistant

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

Note: I prefer to use it for small tasks or basic boilerplate.