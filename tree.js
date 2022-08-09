const names = [
    'Organisé',
    'Volontaire',
    'Curieux',
    'Costaud',
    'Vigilant'
];

const t = [
    [
        {
            t: "Votre bichon ramène le contenu de votre sac, ainsi que $ objets sur votre case (hors encombrant).",
            coef: 2,
            max: 5,
        },
        {
            t: "Au lieu de la direction de la sortie, votre bichon pour indique le chemin le plus court pour sortir d'une ruine",
        },
        {
            t: "(action de maison)<br><span class=\"action\">Jouer avec bichon</span> : Vous donner un objet à bichon, il revient avec un objet de poubelle aléatoire.",
        }
    ],
        /*remove: {
                    t: "L'action <span class=\"action\">ranger votre habitat</span> vous rend également $<img src=\"http://data.hordes.fr/gfx/loc/fr/small_pa.gif\">",
                    max: 3,
                    n: {
                        t: ""
                    }
                }
            }
        }*/
    [
        {
            t: "Vous avez $% de chance que votre bichon ne soit pas fatigué après son premier aller retour de la journée.",
            coef: 20,
            max: 5,
        },
        {
            t: "50% de chance de se réveiller avec 2<img src=\"http://data.hordes.fr/gfx/loc/fr/small_pa.gif\"> supplémentaire",
        },
        {
            t: "<span class=\"action\">Défoule toi</span> : Vous envoyer votre bichon faire le tour de votre case, chaque case à 10% de chance d'être régénérée.",
        }
    ],
                /*remove: {
                    t: "",
                    max: 3
                }
            }
        }*/
    [
        {
            t: "Votre bichon a $% de pour chaque case qui vous sépare de la ville de ramener un objet qui s'y trouve en plus de votre sac.",
            coef: 10,
            max: 5,
        },
        {
            t: "Chaque apport de <img src=\"http://data.hordes.fr/gfx/loc/fr/small_pa.gif\"> qui vous fait gagner un bonus vous fait gagner 1<img src=\"http://data.hordes.fr/gfx/loc/fr/small_pa.gif\"> supplémentaire",
        },
        {
            t: "<span class=\"action\">Va chercher</span> : Vous envoyez votre bichon vous rapporter un objet du batiment le plus proche de votre position (bâtiment non découvert compris)",
        }
    ],
                /*remove: {
                    t: "Vous avez accès à un nouvel amménagement de maison : la niche.",
                    max: 3,
                    n: {
                        t: "L'intégralité de la carte est révélée lors de votre arrivée en ville."
                    }
                }
            }
        }*/
    [
        {
            t: "Vous avez le choix entre rapporter votre sac ou $ encombrants présent sur votre case (sans stéroide)",
            max: 5,
        },
        {
            t: "Vous gagner +10<img src=\"http://www.hordes.fr/gfx/icons/small_zombie.gif\"> supplémentaire en veille",
        },
        {
            t: "<span class=\"action\">Encourager les veilleurs</span> : Tous les veilleurs gagnent +10<img src=\"http://www.hordes.fr/gfx/icons/small_zombie.gif\"> ce soir si vous êtes veilleur",
        }
    ],
                /*remove: {
                    t: "",
                    max: 3
                }
            }
        }*/
    [
        {
            t: "Vos chances de blesser lors d'une aggression sont augmenté de $%",
            coef: 10,
            max: 5,
        },
        {
            t: "Le contenu de votre coffre apparait toujours comme vide",
        },
        {
            t: "<span class=\"action\">Fait le garde</span> : Votre défense personnelle est augmentée de 20 jusqu'à demain.",
        }
    ]
                /*remove: {
                    t: "$ plaintes supplémentaires sont necessaires pour vous bannir.",
                    max: 3,
                    n: {
                        t: "A votre arrivée en ville, la TDG est construite et passe niveau 5 directement."
                    }
                }
            }
        }*/
]

let lastY = -1;
let last = null;

function d(x, y) {
    if(!last && y != 0) return;
    let o = t[x][y];
    if(last != o) {
        if(last && last.v < last.max) return;
        if(y !== lastY+1) return;
    }
    last = o;
    lastY = y;

    if((o.v || 0) < (o.max || 1)) {
        o.v = 1+(o.v || 0);
        gen();
    }
}

const content = $('#content');

function gen(){
    content.empty();
    t.forEach((i, idx) => {
        content.append(`<tr><td><strong><img src="http://data.hordes.fr/gfx/icons/item_tamed_pet.gif"> ${names[idx]}</strong></td>${create(i, idx)}</tr><tr><tr>`);
    });

    function create(i, idx) {
        return i.map((e, edx) => `<td ${((((last && (last.v||0) < last.max) ? 0 : 1)+lastY) == edx)&&(last &&last==e || !last || lastY==edx-1) ? `style="background:#6c2b20;opacity:${e.v > 0 ? 1 : .8}"` : `style="opacity: ${e.v > 0 ? 1 : .5}"`} onwheel="d(${idx}, ${edx});" onclick="d(${idx}, ${edx});"><p>${e.t.replace('$', (e.v || 0)*(e.coef || 1))}</p><span class="point">${e.v || 0}/${e.max || 1}</span></td>`).join();
    }
}

gen();


$('#reseter').bind('click', r => {
    t.forEach(y => y.forEach(z => z.v=0)); 
    lastY = -1;
    last = null;
    gen();
});