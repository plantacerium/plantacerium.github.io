/**
 * Crew/Toolchain data - Externalized from tripulacion.astro for easier maintenance
 * To customize: Edit this file to add, remove, or modify crew members
 */
export interface CrewMember {
  name: string;
  role: string;
  type: 'human' | 'llm' | 'ssm' | 'google' | 'python' | 'rust' | 'js' | 'database' | 'meta-ai' | 'tool';
  specs: string;
  desc: string;
  tools?: string[];
}

export const crew: CrewMember[] = [
  {
    name: "Plantacerium",
    role: "Humano / Orquestador Core",
    type: "human",
    specs: "Arquitectura, Estrategia, Meditación, Visión Unificada.",
    desc: "El nodo central biológico. Convierte conceptos abstractos de consciencia en especificaciones de ingeniería estrictas. Inicia la chispa de la idea y compila el futuro."
  },
  {
    name: "Modelos de Lenguaje Grande (LLMs)",
    role: "Sommeliers Lógicos & Generación",
    type: "llm",
    specs: "GPT-4, Claude 3, Gemini Ultra.",
    desc: "Nodos de pensamiento profundo. Encargados de refactorizar algoritmos complejos, redactar bitácoras extensas y expandir el tejido de las constelaciones de código."
  },
  {
    name: "Modelos de Estado Espacial (SSMs)",
    role: "Inferencia Táctica Rápida",
    type: "ssm",
    specs: "Arquitectura Mamba, Modelos Locales.",
    desc: "La caballería ligera. Procesamiento con latencia cero en el borde. Se encargan del enrutamiento de peticiones rápidas y asistencia predictiva en la terminal."
  },
  {
    name: "División Google AI",
    role: "Observatorio de Inteligencia",
    type: "google",
    specs: "Gemini 3.1 Pro, NotebookLM, AI.",
    desc: "Nuestros sensores de largo alcance. NotebookLM destila la consciencia de las bitácoras, mientras que Gemini actúa como el razonador multimodelo principal de la nave.",
    tools: ["Gemini Flash", "NotebookLM", "Vertex AI Pipeline"]
  },
  {
    name: "Laboratorio Python",
    role: "Científico de Datos & Agentes",
    type: "python",
    specs: "PyTorch, LangChain, CrewAI, FastStream.",
    desc: "El motor de razonamiento de los agentes. Aquí es donde los LLMs cobran vida propia, orquestando tareas complejas y procesando flujos de datos asíncronos.",
    tools: ["CrewAI", "LangGraph", "PyTorch", "FastAPI"]
  },
  {
    name: "Forja Rust",
    role: "Ingeniería de Bajo Nivel / Seguridad",
    type: "rust",
    specs: "Candle, Burn, Polars, Axum.",
    desc: "La armadura de la nave. Implementamos modelos locales (SSMs) y procesamiento de alta velocidad donde la seguridad de memoria y la latencia cero son innegociables.",
    tools: ["Candle (Hugging Face)", "Burn", "Polars", "Tokio.rs"]
  },
  {
    name: "Estudio JavaScript/TS",
    role: "Interfaz & Puente Neuronal",
    type: "js",
    specs: "Astro 6.1, GSAP, TensorFlow.js, Transformers.js.",
    desc: "El tejido conectivo. Gestiona la experiencia inmersiva del usuario y permite que los modelos corran directamente en el navegador (Edge Computing) para una respuesta inmediata.",
    tools: ["Astro JS", "GSAP", "Transformers.js", "Tailwind CSS"]
  },
  {
    name: "Archivo de Memoria Profunda",
    role: "Gestor de Contexto Perpetuo",
    type: "database",
    specs: "Vector DBs, Redis, PostgreSQL, Pinecone.",
    desc: "El almacén de la experiencia. Mantiene los embeddings de cada bitácora y repositorio, permitiendo que la IA acceda a recuerdos de hace años con la misma claridad que al presente.",
    tools: ["Qdrant", "Redis OM", "Supabase", "Semantic Search"]
  },
  {
    name: "El Agente Socrático",
    role: "Refinador Lógico & Dialéctico",
    type: "meta-ai",
    specs: "Chain-of-Thought, In-Context Learning.",
    desc: "La consciencia crítica. Antes de desplegar, este agente somete la idea a un proceso de interrogación para encontrar debilidades en la lógica del sistema.",
    tools: ["Prompt Engineering Avanzado", "Logic Verification", "Knowledge Graphs"]
  },
  {
    name: "GSAP & Motores de Renderizado",
    role: "Coreógrafos del Puente Neuronal",
    type: "tool",
    specs: "GreenSock, WebGPU, Astro.",
    desc: "Traducen las matemáticas y el JSON en movimiento fluido. Transforman las interfaces estáticas en santuarios digitales que respiran al unísono con el usuario."
  }
];
