#!/bin/bash

#CONTAINER - azure registry container
#BRAINBEATS_VERSIONS - get repository tag image versions
#CURRENT_BRANCH - get current branch from the current directory
#PRODUCTION_BRANCH - branch that pushes towards production
#Note make sure files are currently commited.

CONTAINER=brainbeatscontainersregistry

BRAINBEATS_VERSIONS=$(az acr repository show-tags -n brainbeatscontainersregistry --repository brainbeats-web)

CURRENT_BRANCH=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

PRODUCTION_BRANCH="dockerfile-deployment"

# Check if you're current branch is the same as production.
function checkGitBranch(){
    if [ $1 != $2 ];then
        echo "You are currently on a different branch: $1"
        echo "Please switch towards your chosen production branch."
        exit 1
    fi
}

# Check if azure cli is installed and login through container.
function azureCLILogin(){
    if  ! command -v az &> /dev/null; then
        echo "az is not found."
        echo "Please install azcli in your macos/unix derivative device"
        echo "link: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    fi

    az acr login --name $CONTAINER
}

# Compare versions from repository tags and user input tag.
function checkEquality(){
    if [[ $1 = $2 ]]; then
        echo "That version already exists"
        exit 1
    fi
}

# Check current repository tag versions with user input tag.
function collectRepositoryVersions(){
    for VAR in $BRAINBEATS_VERSIONS
    do
        if [ $VAR = "[" ] || [ $VAR = "]" ]
        then
            continue
        fi

        VAR_LENGTH=${#VAR}

        case $VAR_LENGTH in

            5)
            TEMP=$(echo $VAR | cut -c3)
            checkEquality $TEMP $1
            ;;

            8 | 9)
            TEMP=$(echo $VAR | cut -c3-7)
            checkEquality $TEMP $1
            ;;

        esac
    done
}

# Check version formatting.
function versionFormatCheck(){
    regex='^([0-9]+\.){0,2}(\*|[0-9]+)$'

    if [[ "$1" =~ $regex ]]; then
        echo "Version formatting good"
        echo "The version you entered is: $1"
        echo ""
    else
        echo "ERROR: Please check your version formatting."
        exit 1
    fi
}

function main(){
echo "Brain Beats Web Deployment Script"
echo "This script only works if you have a MacOS/Linux."
echo ""
echo ""

echo "registry: $CONTAINER"
echo ""

azureCLILogin

echo "List of available repo version tags: "
echo $BRAINBEATS_VERSIONS
echo ""

echo "Please stick to software versioning semantic. 'v' character will be included."
echo "example: 4.2.1 === 4 Major === 2 Minor === 1 Patch"
echo ""
read -p "Enter in the version for deploying web: " VERSION

versionFormatCheck $VERSION

collectRepositoryVersions $VERSION

echo 'Checking branch status:'
checkGitBranch $CURRENT_BRANCH $PRODUCTION_BRANCH

echo "Beggining docker build process.."
echo "WARNING: Make sure script is in project directory!"

docker build -f "Dockerfile" --tag brainbeats-web . 

docker tag brainbeats-web brainbeatscontainersregistry.azurecr.io/brainbeats-web:v$VERSION

docker push brainbeatscontainersregistry.azurecr.io/brainbeats-web:v$VERSION

echo "Finished! brainbeats-web image version: $VERSION should be deployed in $CONTAINER registry container"
}

main



