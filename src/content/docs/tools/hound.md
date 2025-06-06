---
title: Hound
---

## Hound is for: search in codebases

Pre requisites:
* Make
* Golang +1.16

## Commands
````bash
git clone https://github.com/hound-search/hound
cd hound
make
cd .build/bin
# Create and configure config.json
move config.json to .build/bin
cd .build/bin
./houndd -conf config.json
# Access to localhost:6080
````

## Config json sample
````json
{
    "max-concurrent-indexers" : 2,
    "dbpath" : "data",
    "title" : "Hound",
    "health-check-uri" : "/healthz",
    "vcs-config" : {
        "git" : {
            "detect-ref" : true
        }
    },
    "repos" : {
        "SomeGitRepo" : {
            "url" : "https://www.github.com/YourOrganization/RepoOne.git"
        },
        "AnotherGitRepo" : {
            "url" : "https://www.github.com/YourOrganization/RepoOne.git",
            "ms-between-poll" : 10000,
            "exclude-dot-files" : true,
            "display-name" : "RepoOne (dot files not indexed)",
            "auto-generated-files" : ["example/path"]
        },
        "GitRepoWithDetectRefDisabled" : {
            "url" : "https://www.github.com/YourOrganization/RepoOne.git",
            "vcs-config" : {
                "detect-ref" : false
            }
        },
        "SomeMercurialRepo" : {
            "url" : "https://www.example.com/foo/hg",
            "vcs" : "hg"
        },
        "Subversion" : {
            "url" : "http://my-svn.com/repo",
            "url-pattern" : {
                "base-url" : "{url}/{path}{anchor}"
            },
            "vcs" : "svn"
        },
        "SubversionWithCreds" : {
            "url" : "http://my-private-svn.com/repo",
            "url-pattern" : {
                "base-url" : "{url}/{path}{anchor}"
            },
            "vcs" : "svn",
            "vcs-config" : {
                "username" : "username_for_ro_account",
                "password" : "password_for_ro_account"
            }
        },
        "LocalFolder" : {
            "url" : "file:///absolute/path/to/directory"
        },
        "RepoWithCustomUrls" : {
            "url" : "https://github.com/username/Foo.git",
            "url-pattern" : {
                "base-url" : "{url}/files/{path}{anchor}",
                "anchor" : "#line={line}"
            }
        },
        "BitbucketCustomUrl" : {
            "url" : "git@bitbucket.org:organization/project.git",
            "url-pattern" : {
                "base-url" : "https://{url}/src/master/{path}{anchor}",
                "anchor" : "#{filename}-{line}"
            },
            "vcs-config" : {
                "ref" : "main"
            }
        },
        "RepoWithPollingDisabled" : {
            "url" : "https://www.github.com/YourOrganization/RepoOne.git",
            "enable-poll-updates" : false
        },
        "RepoWithPushingEnabled" : {
            "url" : "https://www.github.com/YourOrganization/RepoOne.git",
            "enable-push-updates" : true
        },
        "RepoIsGitHubWiki" : {
          "url" : "https://github.com/YourOrganization/RepoWithWiki.wiki.git",
          "url-pattern" : {
              "base-url" : "{url}/{path}"
          }
        },
        "BitbucketServerUrl" : {
            "url" : "git@bitbucket.internal.org:7999:organization/project.git",
            "url-pattern" : {
                "base-url" : "https://{hostname}/projects/{project}/repos/{repo}/browse/{path}?at={rev}{anchor}",
                "anchor" : "#{line}"
            },
            "vcs-config" : {
                "ref" : "main"
            }
        },
        "LocalRepo" : {
            "url" : "file:///absolute/path/to/directory",
            "vcs" : "local",
            "url-pattern" : {
                "base-url" : "{url}/{path}"
            },
            "vcs-config" : {
                "watch-changes" : false,
                "ignored-files" : []
            }
        }
    }
}
````