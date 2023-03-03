git fetch --all
git pull origin main
git checkout -f main
yarn
yarn build
yarn preview --host 0.0.0.0 --port 80