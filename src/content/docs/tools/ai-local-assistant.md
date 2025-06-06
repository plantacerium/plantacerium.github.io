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

Note: I prefer to use it for non code tasks or very basic boilerplate.

My real use cases for AI are:
* Questions Creator. Instead of use AI to give me answers, it gives me questions.
* Enhance my quality question creational process.
* Play characters from real life or fictional, to obtain their point of view.
* Enhance my empathical qualities by sharing me different points of view about a situation.
* PDFs Analyzer.

