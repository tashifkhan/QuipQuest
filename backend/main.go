package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
)

func main() {
	fmt.Println("Hi from the backend!")

	r := mux.NewRouter()
	r.HandleFunc("/api/check", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Hello from the backend!")
		fmt.Println("Received a request on /api/check")
	}).Methods("GET")

	http.Handle("/", r)
	fmt.Println("Server is running on port 6990")
	http.ListenAndServe(":6990", nil)
}
