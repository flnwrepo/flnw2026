#!/usr/bin/env bash
# Seed the Sanity Content Lake with initial Frontline content.
# Usage: ./seed/import.sh
set -euo pipefail

cd "$(dirname "$0")/.."

if [ -z "${SANITY_PROJECT_ID:-}" ]; then
  echo "Error: SANITY_PROJECT_ID is not set."
  echo "Export it first:  export SANITY_PROJECT_ID=your_project_id"
  exit 1
fi

DATASET="${SANITY_DATASET:-production}"
SEED_DIR="$(dirname "$0")"

echo "Seeding Sanity project: $SANITY_PROJECT_ID (dataset: $DATASET)"
echo ""

# Import content documents first (practices, stages, industries, etc.)
for file in "$SEED_DIR"/siteSettings.ndjson "$SEED_DIR"/practices.ndjson "$SEED_DIR"/questions.ndjson "$SEED_DIR"/stages.ndjson "$SEED_DIR"/industries.ndjson "$SEED_DIR"/outcomes.ndjson "$SEED_DIR"/insights.ndjson; do
  if [ -f "$file" ]; then
    echo "  Importing: $(basename "$file")"
    npx sanity dataset import "$file" "$DATASET" --replace
  fi
done

# Import homepage last (it references the content documents)
if [ -f "$SEED_DIR/homepage.ndjson" ]; then
  echo "  Importing: homepage.ndjson"
  npx sanity dataset import "$SEED_DIR/homepage.ndjson" "$DATASET" --replace
fi

echo ""
echo "Done. Content is now in the Sanity Content Lake."
