export const languageOptions = [
    {
      "language": "javascript",
      "version": "18.15.0",
      "aliases": [
        "node-javascript",
        "node-js",
        "javascript",
        "js"
      ],
      "runtime": "node"
    },
    {
      "language": "typescript",
      "version": "5.0.3",
      "aliases": [
        "ts",
        "node-ts",
        "tsc",
        "typescript5",
        "ts5"
      ]
    },
    {
      "language": "php",
      "version": "8.2.3",
      "aliases": []
    },
    {
      "language": "python",
      "version": "3.10.0",
      "aliases": [
        "py",
        "py3",
        "python3",
        "python3.10"
      ]
    },
    {
      "language": "csharp",
      "version": "6.12.0",
      "aliases": [
        "mono",
        "mono-csharp",
        "mono-c#",
        "mono-cs",
        "c#",
        "cs"
      ],
      "runtime": "mono"
    },
    {
      "language": "c",
      "version": "10.2.0",
      "aliases": [
        "gcc"
      ],
      "runtime": "gcc"
    },
    {
      "language": "c++",
      "version": "10.2.0",
      "aliases": [
        "cpp",
        "g++"
      ],
      "runtime": "gcc"
    },
    {
      "language": "java",
      "version": "15.0.2",
      "aliases": []
    }
  ]
  export const codeSnippets = {
    javascript: `function sum(a, b) {
      return a + b;
    }`,
  
    typescript: `function sum(a: number, b: number): number {
      return a + b;
    }`,
  
    php: `function sum($a, $b) {
      return $a + $b;
    }`,
  
    python: `def sum(a, b):
      return a + b`,
  
    csharp: `public int Sum(int a, int b) {
      return a + b;
    }`,
  
    c: `int sum(int a, int b) {
      return a + b;
    }`,
  
    cpp: `int sum(int a, int b) {
      return a + b;
    }`,
  
    java: `public int sum(int a, int b) {
      return a + b;
    }`
  };
  