#!/bin/bash
emacs --batch --eval "(require 'org)" $1 --funcall org-html-export-to-html
mv posts/*.html docs/
