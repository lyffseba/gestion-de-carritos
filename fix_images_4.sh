cat src/lib/mockData.ts | grep imageUrl | cut -d"'" -f2 > urls.txt
for url in $(cat urls.txt); do
  status=$(curl -sI "$url" | grep HTTP | awk '{print $2}')
  if [ "$status" != "200" ]; then
    echo "BROKEN: $status $url"
  else
    echo "OK: $url"
  fi
done
