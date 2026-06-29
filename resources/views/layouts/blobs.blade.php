<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{$name}}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <input type="text" data-coloris>
    <main>
    </main>
     <script src="/storage/{{ $js }}.js" type="module"></script>
        <link rel="stylesheet" href="/storage/{{ $css }}.css">
</body>
</html>
