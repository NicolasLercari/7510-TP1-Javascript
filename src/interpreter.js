var Interpreter;
Interpreter = function () {

    function Fact(nombre, params) {
        this.nombre = nombre;
        this.parametros = params;
        this.comparar = function (otroFact, bdd) {
            return ((this.nombre === otroFact.nombre) && (compararDosVectores(this.parametros, otroFact.parametros)));
        }
        this.dameLasCondicionesDeEstaOperacion = function (unFact) {
            return [this];
        }
    };

    function compararDosVectores(vectorUno, vectorDos) {
        return (vectorUno.length == vectorDos.length && vectorUno.every(function (v, i) {
            return v === vectorDos[i]
        }));
    }

    function Rule(nombre, params, condiciones) {
        this.nombre = nombre;
        this.parametros = params;
        this.condicion = condiciones;
        this.especializarCondiciones = function (otroFact) {
            var mapeoParametros = {};
            this.parametros.map(function (x, i) {
                mapeoParametros[x] = otroFact.parametros[i]
            });
            return this.condicion.map(function (x) {
                return new Fact(x.nombre, x.parametros.map(function (y) {
                    return mapeoParametros[y]
                }))
            });
        }

        this.comparar = function (otroFact, bdd) {
            if ((this.nombre === otroFact.nombre) && (this.parametros.lenght === otroFact.parametros.lenght)) {
                var facts = this.especializarCondiciones(otroFact);
                return true;
            }
            return false;
        }

        this.dameLasCondicionesDeEstaOperacion = function (unFact) {
            return this.especializarCondiciones(unFact);
        }
    };

    function parsearFact(unFact) {

        var fact = unFact.replace(".", "");
        fact = fact.replace(/\s+/g, '');
        fact = fact.replace(")", "");
        fact = fact.split("(");
        var params = fact[1];
        params = params.split(",");
        var tupla = [fact[0], params.map(function (x) {
            return x.replace(/\s+/g, '');
        })];
        return tupla;
    }

    function parsearRule(unaRule) {
        var rule = unaRule.replace(".", "");
        rule = rule.replace(")", "");
        tuplaRule = rule.split(":-");
        var rule = tuplaRule[0];
        rule = parsearFact(rule);
        var facts = tuplaRule[1];
        facts = facts.split("),");
        facts = facts.map(function (unFact) {
                return crearFact(unFact);
            }
        );
        return [rule[0], rule[1], facts];
    }

    function crearRule(unaRule) {
        var ruleParseada = parsearRule(unaRule);
        return new Rule(ruleParseada[0], ruleParseada[1], ruleParseada[2]);
    }

    function crearFact(unFact) {
        var factParseado = parsearFact(unFact);
        return (new Fact(factParseado[0], factParseado[1]));
    }

    function esRule(unaRule) {
        return (unaRule.indexOf(":-") > -1);
    }

    this.bdd = null;

    this.parseDB = function (params, paramss, paramsss) {
        try {
            var basedd = params.map(function (x) {
                return x.replace(/\s+/g, "");
            });
            basedd = basedd.map(function (fact) {
                    if (esRule(fact)) {
                        return crearRule(fact);
                    }
                    return crearFact(fact);
                }
            );
            this.bdd = new Bdd(basedd);
        } catch (err){
            this.bdd = null;
        }
    }


    function Bdd(bdd) {
        this.bdd = bdd;
    }

    Bdd.prototype.estaEnBddEsteFact = function (unFact) {
        return this.bdd.map(function (otroFact) {
            return otroFact.comparar(unFact, this)
        }).reduce(function (x, y) {
            return (x || y)
        });
    };

    Bdd.prototype.dameLasCondicionesDeEsteQuery = function (unFact) {
        var facts = [];
        for (i = 0; i < this.bdd.length; i++) {
            if (this.bdd[i].comparar(unFact)) {
                facts = this.bdd[i].dameLasCondicionesDeEstaOperacion(unFact);
                break;
            }
        }
        return facts;
    };

    Bdd.prototype.estaElQueryEnBdd = function(query){
        var factsCondicion = this.dameLasCondicionesDeEsteQuery(query);
        return this.checkCondicionesEnBdd(factsCondicion);
    }

    Bdd.prototype.checkCondicionesEnBdd = function(condiciones){
        if (condiciones.length) {
            return condiciones.map(function (unFact) {
                return this.estaEnBddEsteFact(unFact);
            }, this).reduce(function (y, z) {
                return (y && z)
            });
        }
        return false;
    }

    this.checkQuery = function (params) {
        try {
            var factQuery = crearFact(params);
            return this.bdd.estaElQueryEnBdd(factQuery);
        }
        catch(err) {
            return null;
        }
    }
};

module.exports = Interpreter;
