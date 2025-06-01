package router

import (
	"fmt"
	"net/http"
)

func Hi_handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "Hello from the backend!"}`))

	// Log the request
	fmt.Println("Received a request on /api/hi")
}
