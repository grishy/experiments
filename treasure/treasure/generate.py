import os
static_path = os.path.join(os.getcwd(), 'site')
url = "http://localhost:8080/"

command = ("wget "
           "--recursive "             # follow links to download entire site
           "--convert-links "         # make links relative
           "--page-requisites "       # grab everything: css / inlined images
           "--no-parent "             # don't go to parent level
           "--directory-prefix {1} "  # download contents to static/ folder
           "--no-host-directories "   # don't create domain named folder
           "{0}").format(url, static_path)

os.system(command)
