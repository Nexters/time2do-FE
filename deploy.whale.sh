git fetch --all
git pull origin deploy
git checkout deploy
yarn
yarn build
yarn preview --host 0.0.0.0 --port 80