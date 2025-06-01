package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/tashifkhan/QuipQuest/backend/db/users"
	"github.com/tashifkhan/QuipQuest/backend/router"
)

func main() {
	fmt.Println("Hi from the backend!")

	r := mux.NewRouter().
		PathPrefix("/api/").
		Subrouter()

	r.
		HandleFunc(
			"/check",
			router.Check_handeler,
		).
		Methods("GET")

	r.
		HandleFunc(
			"/hi",
			router.Hi_handler,
		).
		Methods("GET")

	http.Handle("/", r)
	users.Prining()
	fmt.Println("Server is running on port 6990")
	http.ListenAndServe(":6990", nil)
}
