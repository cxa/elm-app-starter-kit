module Main exposing (..)

import Html exposing (..)
import Counter.State exposing (..)
import Counter.View exposing (..)


main : Program Never Int Msg
main =
    Html.beginnerProgram
        { model = 0
        , view = view
        , update = update
        }
