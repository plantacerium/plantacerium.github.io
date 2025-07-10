---
title: Git VCS
---

## Links Resources
* [Git](https://git-scm.com)
* [GitHub Cli](https://cli.github.com/)
* [Gitea](https://about.gitea.com/)
* [Jujutsu](https://jj-vcs.github.io/jj/latest/)

## Git Install
````bash
curl -o git.tar.gz https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.26.2.tar.gz
````
````bash
git --version
````

## Git commands
Initialize a local Git repository
````bash
git init
````
clone public repository
````bash
git clone [repository-url]
````
Clone private repository
````bash
git clone ssh://git@github.com/[username]/[repository-name].git
````
Check status
````bash
git status
````
Add a file to the staging area
````bash
git add [file-name]
````
Add all new and changed files to the staging area
````bash
git add -A
````
Commit changes
````bash
git commit -m "[commit message]"
````
Remove a file (or folder)
````bash
git rm -r [file-name.txt]
````
Show current branch
````bash
git branch
````
List of branches
````bash
git branch -a
````
Create a new branch
````bash
git branch [branch name]
````
Delete a branch
````bash
git branch -d [branch name]
````
Delete a branch forcefully
````bash
git branch -D [branch name]
````
Delete a remote branch
````bash
git push origin --delete [branch name]
````
Create a new branch and switch to it
````bash
git checkout -b [branch name]
````
Clone a remote branch and switch to it
````bash
git checkout -b [branch name] origin/[branch name]
````
Rename a local branch
````bash
git branch -m [old branch name] [new branch name]
````
Discard changes to a file
````bash
git checkout -- [file_name.txt]
````
Merge a branch into the active branch
````bash
git merge [branch name]
````
Merge a branch into a target branch
````bash
git merge [source branch] [target branch]
````
Stash changes in a dirty working directory
````bash
git stash
````
Remove all stashed entries
````bash
git stash clear
````
Push a branch to your remote repository
````bash
git push origin [branch name]
````
Push changes to new branch at remote repository 
````bash
git push -u origin [branch name]
````
Push changes to remote repository
````bash
git push
````
Delete a remote branch
````bash
git push origin --delete [branch name]
````
Update local repository to the newest commit
````bash
git pull
````
Pull changes from remote repository
````bash
git pull origin [branch name]
````
Add a remote repository
````bash
git remote add origin ssh://git@github.com/[username]/[repository-name].git
````
Set a repository's origin branch to SSH
````bash
git remote set-url origin ssh://git@github.com/[username]/[repository-name].git
````
View changes
````bash
git log
````
View detailed changes
````bash
git log --summary
````
View changes, briefly
````bash
git log --oneline
````
Preview changes before merging
````bash
git diff [source branch] [target branch]
````
Revert commit changes
````bash
git revert commitId
````
Set globally Username
````bash
git config --global user.name "your_username"
````
Set globally Email id
````bash
git config --global user.email "your_email_address@example.com"	
````
Get global config
````bash
git config --global --list
````

## GitHUb CLI
````bash
sudo dnf install gh

gh auth login

gh repo clone <repository>
````


## Gitea

````bash
mkdir -p /data/gitea
````

````yml
//compose.yml
version: '2'

services:
  gitea:
    image: gitea/gitea:latest
    container_name: gitea
    environment:
      - USER_UID=1000
      - USER_GID=1000
    volumes:
      - /data/gitea:/data
    ports:
      - "3000:3000"
      - "222:22"
    restart: always
````

````bash
docker-compose --file compose.yaml up -d
````
Or
````bash
podman compose --file compose.yaml up --detach
````

## Jujutsu
````bash
cargo binstall --strategies crate-meta-data jj-cli
````

````bash
source <(jj util completion bash)
````

````bash
source <(COMPLETE=bash jj)
````

````bash
jj git clone [repository-url]
````
