# Documentation

### Base Url

### [](https://meta-care.herokuapp.com/)`https://meta-care.herokuapp.com/`

## **Movies**

**Endpoints**
**.** `/movies` \-\- gets movies resources

**Example request**

`https://metacare.heroku.com/movies`

**Example response**

```javascript
HTTP/1.0 200 OK
Content-Type: application/json
Method: GET
{
    "success": true,
    "message": "request successful",
    "results": [
        {
            "title": "A New Hope",
            "opening_crawl": "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
            "comment_count": 2
        },
        {
            "title": "Revenge of the Sith",
            "opening_crawl": "War! The Republic is crumbling\r\nunder attacks by the ruthless\r\nSith Lord, Count Dooku.\r\nThere are heroes on both sides.\r\nEvil is everywhere.\r\n\r\nIn a stunning move, the\r\nfiendish droid leader, General\r\nGrievous, has swept into the\r\nRepublic capital and kidnapped\r\nChancellor Palpatine, leader of\r\nthe Galactic Senate.\r\n\r\nAs the Separatist Droid Army\r\nattempts to flee the besieged\r\ncapital with their valuable\r\nhostage, two Jedi Knights lead a\r\ndesperate mission to rescue the\r\ncaptive Chancellor....",
            "comment_count": 0
        },
        ...
    ]
}
```

## **Comments**

**Endpoints**
**.** `/movies/:id/comments` \-\- gets comment resources

**Methods:** `GET`**,** `POST`

**Example request :** `GET`

`https://metacare.heroku.com/movies/1/comments`

**Example response**

```javascript
HTTP/1.0 200 OK
Content-Type: application/json
Method: GET

{
    "error": false,
    "results": [
        {
            "id": 2,
            "film_url": "https://swapi.py4e.com/api/films/1/",
            "comment": "Hello world and welcom to this side of every thing that is not new anymore in the world of sport.",
            "ip_address": "192.168.44.187",
            "date": "Mon, 24 Jan 2022 22:48:13 GMT"
        },
        {
            "id": 1,
            "film_url": "https://swapi.py4e.com/api/films/1/",
            "comment": "Hello world from this side of the world and the other one that was not here the other day and i was not here to witness the changes that was taking place the other day and the one that you mentioned to me right now and the one that you are so afraid to make mention of that i have forgoten you are the only one that i am they say we are moving fast and we wunt last and where thet are alwassy knew we will make it dfar. nothing at the end o f th day thast my baby i wil show you love.",
            "ip_address": "198.773.89:3000",
            "date": "21/11/2022"
        }
    ]
}
```

**Example request :** `POST` 

`https://metacare.heroku.com/movies/1/comments`

```javascript
Content-Type: application/json
Method: POST

{
  "comment": "Hello world and welcome to this amazing new features."
}
```

**Example response**

```javascript
HTTP/1.0 200 OK
Content-Type: application/json
Method: POST

{
    "success": true,
    "message": "comment sent successfully"
}
```

## **Characters**

**Endpoints**
**.** `/movies/:id/characters` \-\- gets character resources

**Example request :** `GET`

`https://metacare.heroku.com/movies/1/characters`

**Example response**

```javascript
HTTP/1.0 200 OK
Content-Type: application/json
Method: POST

{
    "success": true,
    "total_height": {
        "cm": 3066,
        "ft": "90.18"
    },
    "total_characters": 18,
    "message": "request successful",
    "results": [
        {
            "name": "Luke Skywalker",
            "height": "172",
            "gender": "male"
        },
        {
            "name": "Raymus Antilles",
            "height": "188",
            "gender": "male"
        },
        ...
    ]
}
```

## **Sorting**

### Endpoints

. `/movies/:id/characters` \-\- gets character resources

**Query parameters**

**.** `name` \-\-\- `asc | desc` 

**.** `gender` \-\-\- `asc | desc` 

**.** `height` \-\-\- `asc | desc` 

**Example request :** `GET`

**.** `https://metacare.heroku.com/movies/1/characters?name=asc&gender=desc&height=asc`

**.** `https://metacare.heroku.com/movies/1/characters?name=desc`

**Example response**

```javascript
HTTP/1.0 200 OK
Content-Type: application/json
Method: POST
{
    "success": true,
    "total_height": {
        "cm": 3066,
        "ft": "90.18"
    },
    "total_characters": 18,
    "message": "request successful",
    "results": [
        {
            "name": "Wilhuff Tarkin",
            "height": "180",
            "gender": "male"
        },
        {
            "name": "C-3PO",
            "height": "167",
            "gender": "n/a"
        },
        ...
    ]
}
```