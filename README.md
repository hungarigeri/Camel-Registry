# 🐪 Camel Registry - Full-Stack Project

Ez a projekt egy két részből álló technikai feladat implementációja: egy **ASP.NET Core Minimal API** backend és egy **Angular 19** frontend alkalmazás, amely tevék (Camels) nyilvántartására szolgál.

---

## 🛠 Technológiai Stack

### **Backend** (`/Backend`)
* **Keretrendszer:** .NET 8.0 Minimal API
* **Adatbázis:** SQLite (Entity Framework Core)
* **Dokumentáció:** OpenAPI (Swagger UI)
* **Tesztelés:** xUnit

### **Frontend** (`/Frontend`)
* **Keretrendszer:** Angular 19 (Standalone components)
* **Stílus:** Bootstrap 5
* **Form kezelés:** Reactive Forms
* **Kommunikáció:** HttpClient

---

## 🚀 Gyorsindítás (Quick Start)

### **1. Backend indítása**
A backend automatikusan létrehozza az SQLite adatbázist (`camels.db`) az első indításkor. Az alkalmazás alapértelmezetten a `5242`-es porton fut.

```bash
# Lépj be a backend mappába
cd Backend/CamelRegistry

# Függőségek visszaállítása és futtatás
dotnet restore
dotnet run
