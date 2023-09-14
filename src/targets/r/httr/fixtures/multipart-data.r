library(httr)

url <- "https://httpbin.org/anything"

payload <- "-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"foo\"; filename=\"src/fixtures/files/hello.txt\"\r\nContent-Type: text/plain\r\n\r\nHello World\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"bar\"\r\n\r\nBonjour le monde\r\n-----011000010111000001101001--"

encode <- "multipart"

response <- VERB("POST", url, body = payload, content_type("multipart/form-data"), encode = encode)

content(response, "text")