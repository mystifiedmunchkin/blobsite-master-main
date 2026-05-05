<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
@csrf
    <title>Blobsite</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Styles / Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="font-sans antialiased bg-black">

    <div class="bg-black text-white  flex items-center justify-center overflow-x-hidden">
        <div class="relative min-h-screen max-w-5xl selection:bg-[#ff9e20] selection:text-black">
            <div class="relative gap-4  w-full px-6 ">
                <main>
                    <div class="justify-center block gap-4 items-center mx-auto">
                        <h1 class="velve">
                            @php
                                $ids = \App\Models\Blob::all()->pluck('id');

                                $ids = $ids->sortDesc();

                            @endphp Nombre de textures blob : {{ \App\Models\Blob::all()->count() }}
                        </h1>
                        <h2 class="text-2xl">
                            les derniers en date :
                        </h2>
                    </div>
                    <div class="w-full grid-cols-1 lg:grid-cols-2 justify-center flex flex-wrap gap-4">
                        @foreach ($ids as $l)
                            <a href="/blobs/{{ $l }}">
                                <div class="max-w-lg bg-white">
                                    <h2 class="text-2xl text-center w-xs h-32">{{ \App\Models\Blob::find($l)->name }}
                                        </h3>
                                        <div class="lg:w-[20%] relative items-center justify-center">
                                            <iframe src="/blobs/{{ $l }}"
                                                class="scale[75%] overflow-hidden" width="320" height="320">
                                            </iframe>
                                        </div>
                                </div>
                            </a>
                        @endforeach
                    </div>
                </main>
                <footer class="py-16 text-center text-sm  text-white">
                </footer>
            </div>
        </div>
    </div>
</body>

</html>
