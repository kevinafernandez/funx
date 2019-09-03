# Funx Aplicación

Aplicación basada en RoR 5.2.3

## Tabla de contenidos
* [Información general](#información-general)
* [Tecnologías](#tecnologías)
* [Instalación](#instalación) 
* [Carpetas](#carpetas)
* [Parte 2 Factorial](#parte-2-factorial)

## Información general

Simple aplicación que muestra gráficamente el top de artistas con más reproducciones de sus álbums, los datos son consumidos a través de una API: `https://https://github.com/kevinafernandez/funx_api`
	
## Tecnologías

Para este proyecto debes considerar o instalar las siguientes versiones:
  * Ruby: `2.5.3`
  * Rails: `5.2.3`

## Instalación

* Clona este repositorio vía HTTPS: `https://github.com/kevinafernandez/funx.git`

* Instala todas las gemas y dependencias: `bundle install`

* Por defecto, crea la BD y ejecuta las migraciones: `rails db:create && rails db:migrate`

* **Para visualizar la gráfica con datos, debes crear desde la API al menos un artista y un álbum relacionado a dicho artista (ejemplos: https://github.com/kevinafernandez/funx_api#ejemplos), de lo contrario, la aplicación validará que no existen datos por mostrar en la gráfica.**

* Al ejecutar los servidores de la API y la aplicación al mismo tiempo, inicia el servidor de la API en otro puerto, ejemplo: `rails server -p3001` y el servidor de la aplicacion en su puerto por defecto: `rails server` ó viceversa.

## Carpetas

* `app/views/home/index` - Contiene la vista principal en donde se despliega el gráfico para el top de artistas.

* `public/javascript/lib/chart.js` - Contiene la lógica donde se crea el gráfico, se utilizó la librería ChartJS (info: https://www.chartjs.org/) para dicha implementación.

## Parte 2 - Factorial

* `public/exercise/factorial.rb` - Contiene el ejercicio del factorial de un número, esto como resolución de la 2da parte de la prueba, en el se aplican dos soluciones para obtener el factorial, la primera con **recursividad** y la segunda con **iteración**.