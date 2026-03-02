#!/usr/bin/env bash
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PUBLIC_APPS="$ROOT_DIR/public/apps"

mkdir -p "$PUBLIC_APPS"

build_project() {
  local slug="$1"
  local subfolder="$2"
  local project_dir="$ROOT_DIR/src/projects/$slug/$subfolder"

  if [ ! -d "$project_dir" ]; then
    echo "⚠️  Diretório não encontrado: $project_dir — pulando"
    return
  fi

  echo "🔨 Building $slug..."

  cd "$project_dir"
  npm install --silent
  npx vite build

  rm -rf "$PUBLIC_APPS/$slug"
  mv dist "$PUBLIC_APPS/$slug"

  echo "✅ $slug → public/apps/$slug/"
}

build_project "klini" "Projeto Klini"
build_project "akad" "Projeto Akad"
build_project "seguro-vida" "Projeto seguro de vida"
build_project "plano-saude" "Projeto Plano de Saúde"
build_project "loja-kaos" "Projeto Loja Kaos"

echo ""
echo "🚀 Todos os projetos buildados com sucesso!"
