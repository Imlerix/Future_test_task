#!/usr/bin/env bash

# filename: create.component.sh
echo "Enter name of the React Component:"
read name
echo "Functional or Class component? (f/c)"
read componentType

if [ -d src/components/$name ];
then
    echo "Component already exists!"
else
    if [[ $componentType == 'f' ]];
    then
        mkdir src/components/$name
        touch src/components/$name/index.jsx
        touch src/components/$name/style.module.css


        echo -e "import React from 'react';\
import style from './style.module.css';

        function $name() {
            return (
                <div className={style.$name"'Container'"}>
                    $name
                </div>
            );
        }

        export default $name;
        " >> src/components/$name/index.jsx

        echo -e ".$name"'Container'"{}
        " >> src/components/$name/style.module.css
        echo "| functional component |"

        echo " ------------------------------------------------ "
        echo "| Component '$name' is created with all files!   |"
        echo " ------------------------------------------------ "
    elif [[ $componentType == 'c' ]];
    then
        mkdir src/components/$name
        touch src/components/$name/index.jsx
        touch src/components/$name/style.module.css

        echo -e "import React from 'react';
import style from './style.module.css';

        class $name extends React.Component{
            constructor(props){
                super(props)
                this.state = {}
            }

            componentDidMount() {}

            componentWillUnmount() {}

            render() {
                return(
                    <div className={style.$name"'Container'"}>
                        $name
                    </div>
                )
            }
        }

        export default $name;">> src/components/$name/index.jsx

        echo -e ".$name"'Container'"{}" >> src/components/$name/style.module.css

        echo "| class component |"
        echo " ------------------------------------------------ "
        echo "| Component '$name' is created with all files!   |"
        echo " ------------------------------------------------ "

    else

        echo "INCORRECT INPUT, TRY AGAIN"
    fi
    open src/components/$name/index.jsx
    open src/components/$name/style.module.css
fi
