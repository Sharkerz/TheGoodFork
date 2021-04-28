$(document).ready(function () {
    const lang = $('#language_selected').val()
    let langURL = '//cdn.datatables.net/plug-ins/1.10.24/i18n/English.json'

    if(lang === 'fr') {
        langURL = '//cdn.datatables.net/plug-ins/1.10.24/i18n/French.json'
    }

    $('#userTable').DataTable( {
        "language": {
            url: langURL
        }
    });
})
