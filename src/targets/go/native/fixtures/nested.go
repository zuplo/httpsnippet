package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://httpbin.org/anything?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value"

	req, _ := http.NewRequest("GET", url, nil)

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}