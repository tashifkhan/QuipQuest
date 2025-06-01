package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/tashifkhan/QuipQuest/backend/db/users"
	"github.com/tashifkhan/QuipQuest/backend/router"
)

func main() {
	fmt.Println("Hi from the backend!")

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	databaseURL := os.Getenv("DATABASE_URL")
	println("Database URL:", databaseURL)

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
