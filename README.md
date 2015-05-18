[![Dependency Status](https://david-dm.org/sto3psl/InfoVis-VBB-Fahrplandaten-Starplot.svg)](https://david-dm.org/sto3psl/InfoVis-VBB-Fahrplandaten-Starplot)
[![devDependency Status](https://david-dm.org/sto3psl/InfoVis-VBB-Fahrplandaten-Starplot/dev-status.svg)](https://david-dm.org/sto3psl/InfoVis-VBB-Fahrplandaten-Starplot#info=devDependencies)

#InfoVis VBB-Fahrplandaten Starplot

**Interaktive Informationsvisualisierung**

**Professur für Multimedia-Technologie**

**TU Dresden**

##Installation
Ladet euch [node.js](http://nodejs.org) herunter und installiert es.
Dann habt ihr auf der Kommandozeile das `node` Kommando.

Probiert ob es funktioniert:

```bash
node --version
v0.12.2
```

Danach solltet ihr [npm](http://npmjs.org) auf den aktuellsten Stand bringen:

```bash
npm install -g npm
```

Mit npm werden wir unsere benötigen (javascript-) Pakete und Tools installieren. Es verwaltet Abhängigkeiten und Versionen für uns.

Um mit dem Entwickeln beginnen zu können müsste ihr dieses Repository klonen, die Abhängigkeiten
installieren und den development server starten.
Dazu führt ihr folgende Befehle aus:

```bash
git clone https://github.com/sto3psl/InfoVis-VBB-Fahrplandaten-Starplot.git
npm install
npm start
```

**Hinweis!** Die CSV-Dateien liegen nicht im git (eine ist über 400mb groß). Bitte ladet sie selbst runter und legt sie in den Ordner:

```
./build/data
```

Dieser Ordner steht auch in der `.gitignore`, damit ihr nicht ausversehen 400mb Daten hochladet.


Die App ist dann unter `http://localhost:3000/` zu erreichen.

##Libraries/Frameworks

* [ampersand-view](http://ampersandjs.com/docs#ampersand-view)
* [browserify](http://browserify.org)
* [cssnext](https://cssnext.github.io)
* [d3.js](http://d3js.org)
* [papaparse](http://papaparse.com)
* Weitere, siehe package.json

Weitere findet ihr auf [npmjs.com](https://npmjs.com).

Diese müsst ihr mit `npm install --save paket-name` installieren. Dabei wird auch gleich die entsprechende Information im `dependencies` Feld der `package.json` hinterlegt, so dass in Zukunft auch alle anderen diese Abhängigkeit einfach installieren können.

__Hinweis:__ Fügt jemand in einem commit eine neue Abhängigkeit hinzu, müssen die anderen nach dem nächsten `git pull` wieder `npm install` durchführen.


##Nützliche Plugins

Dieser Befehl installiert [Javascript Standard Style](https://github.com/feross/standard). 

```bash
npm install standard -g
```

Dieses kleine Tool überprüft unsere .js-Dateien ob sie den Javascript Style Regeln entsprechen. Das sorgt für bessere Übersichtlichkeit im Code und Konsistenz.

###Sublime Text

* [Package Control](https://packagecontrol.io) (Paketmanager für Sublime Plugins)
* [Jade](https://packagecontrol.io/packages/Jade) (Syntaxhighlighting für .jade-Dateien)
* [SublimeLinter](https://packagecontrol.io/packages/SublimeLinter) (Code linting)
* [SublimeLinter-contrib-standard](https://packagecontrol.io/packages/SublimeLinter-contrib-standard) (Überprüft Code Style der in Sublime Text geöffneten .js-Dateien)

###Atom

* [Jade](https://atom.io/packages/atom-jade) (Syntaxhighlighting für .jade-Dateien)
* [Linter](https://atom.io/packages/linter) (Code linting)
* [linter-js-standard](https://atom.io/packages/linter-js-standard) (Überprüft Code Style der in Sublime Text geöffneten .js-Dateien)

Falls jemand andere Code-Editoren nutzt schaut bitte selbst nach ob es entsprechende Plugins gibt.

##Git Workflow

Als erstes solltet ihr schauen, dass ihr `git` [installiert](http://git-scm.com/downloads) habt und es anständig [konfiguriert](https://help.github.com/articles/set-up-git/) ist. Falls git euch regelmäßig nach eurem Github Passwort fragt, ist es hilfreich es im [Schlüsselbund zu speichern](https://help.github.com/articles/caching-your-github-password-in-git/).

Der von uns verwendete Workflow ist [hier](https://guides.github.com/introduction/flow/) ausführlich beschrieben. Im Prinzip gilt folgendes:

* Der `master` branch funktioniert immer und ist weitesgehend die live Version.
* Neue Ideen/Features werden in extra branches (`git checkout -b neuer-branch-name`) entwickelt.
* Diese Branches werden zu Github gepusht (`git push origin neuer-branch-name`) und können dort als Pull Requests diskutiert werden.
* Wenn die Arbeiten fertig und alle zufrieden sind, wird der branch zu `master` gemergt.

Beispiel:

```bash
$ git checkout -b mein-cooles-feature master
# tests + code schreiben
$ git add änderungen.js
$ git commit -m "Kurze Beschreibung was geändert wurde"
$ git push origin mein-cooles-feature
```

[Cheatsheet](https://training.github.com/kit/downloads/github-git-cheat-sheet.pdf)
[Github Emojis](http://www.emoji-cheat-sheet.com/) 

##Contributors

* Lara Paeske
* Olga Davydkina
* Oliver Lenz
* Erik Lier
* Fabian Gündel

## 

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
