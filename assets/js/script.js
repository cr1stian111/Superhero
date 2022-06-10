let validacion = (id) => {
    let respuesta = true;
    if (!isNaN(id)) {
        if (id <= 0) {
            alert("Debe ingresar un numero mayor que 0")
            respuesta = false;
        } else if (id > 731) {
            alert("Debe ingresar id menor que 731");
            respuesta = false;
        }
    } else {
        alert("Debe ingresar un numero como id")
    }
    return respuesta;
}

//CARGA DEL DOCUMENTO
$(document).ready(function () {
    $("#button").click(function () {
        let id = $("#idSuperheroe").val();
        if (validacion(id)) {
            $("#card").css("display", "inline");
            //capturar por identificador de id del boton, tomar el id del superheroe
            let url_api = "https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/4905856019427443/" + id;
            $.ajax({
                type: "GET",
                url: url_api,
                dataType: "json",
                success: function (datos_hero) {
                    console.log(datos_hero) //tira los datos en consola 
                    muestraDatos(datos_hero);
                    grafica(datos_hero);
                },
                error: function (error) {
                    alert("ocurrio un error");
                },
            })
        }


    })
})

let muestraDatos=(datos_hero)=>{
    $("#imagen").attr("src", datos_hero.image.url);
    $("#nombre").html(`<b>Nombre:</b> ${datos_hero.name}`);
    $("#conexiones").html(conexiones(datos_hero.connections));
    $("#publicado").html(`<p><b>Publicado por:</b> ${publicacion(datos_hero)}</p><hr>`);
    $("#ocupacion").html(`<p><b>Ocupación:</b> ${ocupacion(datos_hero)}</p><hr>`);
    $("#primeraAparicion").html(`<p><b>Primera Aparición:</b> ${aparicion(datos_hero)}</p><hr>`);
    $("#altura").html(`<p><b>Altura:</b> ${altura(datos_hero)}</p><hr>`);
    $("#peso").html(`<p><b>Peso:</b> ${peso(datos_hero)}</p><hr>`);
    $("#alianzas").html(`<p><b>Alianzas:</b> ${alianzas(datos_hero)}</p>`);
}


let conexiones = (objeto_conexiones) => {
    return `<p><b>Conexiones:</b> ${objeto_conexiones["group-affiliation"]}</p><b>Parientes:</b> ${objeto_conexiones["relatives"]}<p></p><hr>`
}

let publicacion = (objeto) => {
    return objeto.biography.publisher;;
}
let ocupacion = (objeto) => {
    return objeto.work.occupation;
}

let aparicion = (objeto) => {
    return objeto["biography"]["first-appearance"]
}

let altura = (objeto) => {
    return objeto.appearance.height;
}

let peso = (objeto) => { 
    return objeto.appearance.weight;
}

let alianzas = (objeto) => {
    return objeto.biography.aliases;
}

function grafica(superHero) {
    let listaPoderes = [];
    let objPoderes = superHero.powerstats;
    for (const poder in objPoderes) {
        if (objPoderes[poder] == "null") {
            objPoderes[poder] = "0";
        }
        listaPoderes.push({ "y": objPoderes[poder], "label": poder })
    }
    let chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: `Estadísticas de poder para ${superHero.name}`
        },
        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}",
            dataPoints: listaPoderes
        }]
    })
    chart.render();

}
