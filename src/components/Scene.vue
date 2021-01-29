<template>
<div class="rounded shadow mt-4 p-4 m-4 text-green-200 bg-green-600">C'est marrant ce texte à l'envers, on dirait qu'il y a eu un problème ...</div>
<img class="rounded shadow m-4 transform rotate-12" width="50" src="https://media1.tenor.com/images/f38bd4f0ae23b4d7d594c388ab4f09ed/tenor.gif" />
<textarea class="p-4 rounded shadow resize border m-4" />
<div class="bg-blue-300">Hello Guys! It Works!</div>
<pre class="bg-gray-300">data = {{ $data }}</pre>
<pre class="bg-gray-300">classes = {{ $attrs.scene.template[0].attributes.class.split(' ') }}</pre>
<pre class="bg-gray-300">nb of classes = {{ $attrs.scene.template[0].attributes.class.split(' ').length }}</pre>
<pre class="bg-red-300">props = {{ $props }}</pre>
</template>
