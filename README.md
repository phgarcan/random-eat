# Random Eat
Ce dossier contient les fichiers de mon projet de fin de cours de Visualisation de Données à
l'[HEIG-VD](https://heig-vd.ch)

## Introduction
Dans le cadre du cours de **Visualisation de Données** de la filière d'**Ingénierie des Médias** à la **Haute École 
d'Ingénierie et de Gestion du Canton de Vaud**, il a été mandaté de développer une application web utilisant les outils 
présentés durant les cours. Que cela soit pour la génération de graphes ou pour la création de cartes, la visualisation 
de données devient un domaine essentiel à maîtriser face à l'ascension du bigdata. 

Le projet développé pour ce travail est nommé **RandomEAT** et est axé sur la représentation de données sur une carte 
géographique à l'aide de la bibliothèque JavaScript **Leaflet**. RandomEAT permet de retrouver des restaurants près de 
soi et de manière aléatoire grâce à la **géolocalisation**. Intégré dans la plupart des appareils connectés 
d'aujourd'hui, celle-ci est devenue une fonctionnalité qui occupe de plus en plus de place dans le monde privé et 
professionnel.

### Provenance des données
Les données représentées sur la carte géographique proviennent du serveur **API Overpass**. Cet outil permet de requêter 
des données **Open Street Maps** selon des critères de recherche précis. Par exemple : de quel endroit il s'agit, 
quelles sont les informations à propos de cet endroit, dans quelle région il se trouve, etc. Il agit comme une base de 
données sur le Web: le client envoie une requête à l'API Overpass et récupère le jeu de données correspondant à la 
requête.

- Exemple de requête sur l'API Overpass <br/>
`'http://www.overpass-api.de/api/interpreter',
     '?data=[out:json][timeout:25];',
     '(node["amenity"="restaurant"]',
     ``(${bbox[1]},${bbox[0]},${bbox[3]},${bbox[2]});``,
     ');out body;>;out skel qt;'`
- [Aperçu des résultats de cette requête pour la ville de Yverdon-les-Bains](https://heig.ch/vA7oA)

### Transformation des données
La requête ci-dessus, lorsque exécutée dans l'application, permet d'obtenir tous les restaurants présents dans un rayon 
de 2km depuis la géolocalisation de l'utilisateur. Ces informations sont transformées au format **JSON** et enregistrées 
dans une liste afin d'éviter de nouvelles requêtes. Le langage **JavaScript** permet par la suite de sélectionner et de 
trier les données obtenues. Celles-ci sont également intégrées au code HTML en tant qu'information à l'utilisateur.

### Les choix faits et pourquoi
- **[Leaflet.js](https://leafletjs.com/index.html)** : librairie JavaScript libre pour la construction de cartes interactives
- **[Turf.js](https://turfjs.org/)** : librairie JavaScript pour l'analyse géospatiale
- **[Node.js](https://nodejs.org/en/)** : mise en place d'un environnement de développement
- **[Bulma](https://bulma.io/)** : framework **CSS** libre

### Comment les données ont été visualisées
Les données ont été enregistrées dans un premier temps sous format JSON (texte structuré) pour qu'elles puissent 
être ensuite interogées et exploitées lors de l'usage de l'application.

[![](https://i.ibb.co/GPRWNvB/image.png)](https://i.ibb.co/GPRWNvB/image.png)

### Explication sur le choix du type de représentation
Le moyen le plus adapté pour représenter la localisation d'un endroit est à travers une carte. Permettre à l'utilisateur
d'interagir avec cette dernière et qu'il puisse se représenter la distance le séparant des différents établissements. 

### Le publique cible
RandomEAT a été développée pour permettre aux personnes d'avoir une vue d'ensemble des différents restaurants dans les 
environs où elles se trouvent. Ainsi cela touche toutes personnes en mesure d'utiliser un appareil géolocalisable, que 
cela soit aux alentours de leur domicile ou dans une région inconnue.

### Améliorations
- Permettre aux utilisateurs de choisir leur localisation via formulaire (input)
- Rendre l'application utilisable sur les dispositifs mobiles
- Traçage d'itinéraire
- Rajouter des informations concernant le restaurant au _PopUp_

*"L'important, ce ne sont pas les cartes, c'est ce que vous en faites" - Anonyme*