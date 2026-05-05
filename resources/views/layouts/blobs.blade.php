<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $name }}</title>
@csrf
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script type="module" src="../storage/{{$head}}">
    </script>
</head>

<body class="min-h-screen">
    <input id="main-color" type="text" data-coloris>
<div class="ping-pong w-4 h-4"></div>
    {!! html_entity_decode($data) !!}

</body>

</html>
