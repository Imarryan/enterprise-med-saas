@echo off
git config --global user.email "codin@example.com"
git config --global user.name "codin"
git add .
git commit -m "Initial commit Enterprise Med SaaS"
gh repo create enterprise-med-saas --public --source=. --remote=origin --push
echo Done! Check above for your GitHub repo URL.
