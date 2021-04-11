dotlang is a very quickly thrown together .lang file parser
it will parse files and look for a `key=value` it will ignore everything else

this is why it is a bad parser it wont throw errors because it does not give a flying fuck what else is in the file
it is just pulling out the key and values then returning a map