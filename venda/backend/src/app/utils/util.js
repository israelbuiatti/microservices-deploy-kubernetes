export default {

    teste() {
        console.log('teste');
    },

    teste2() {
        return "OK";
    },

    reformatDate(dateStr) {
        
        if (!dateStr) return null;

        const dArr = dateStr.split("/");
        return dArr[2] + "-" + dArr[1] + "-" + dArr[0];
    },

    moedaToUS(value) {
        value = String(value);
        value = value.split(".").join("");
        value = value.split(",").join(".");
        return parseFloat(value);
    }

}