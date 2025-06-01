package router

import (
	"fmt"
	"net/http"
)

func Check_handeler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello from the backend!")
	fmt.Println("Received a request on /api/check")
}
