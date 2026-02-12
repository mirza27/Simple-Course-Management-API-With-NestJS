api:
	npm run start:dev --env-file .env

db:
	docker compose -f docker-compose.yml --env-file .env up database -d 

generate:
	npm run typeorm:migration:generate -- src/database/migration/$(name)

migrate:
	npm run typeorm:migration:run

revert:
	npm run typeorm:migration:revert

seed:
	npm run seed

.PHONY: api db