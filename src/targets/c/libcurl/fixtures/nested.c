CURL *hnd = curl_easy_init();

curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "GET");
curl_easy_setopt(hnd, CURLOPT_WRITEDATA, stdout);
curl_easy_setopt(hnd, CURLOPT_URL, "https://httpbin.org/anything?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value");

CURLcode ret = curl_easy_perform(hnd);