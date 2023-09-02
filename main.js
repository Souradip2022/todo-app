
window.addEventListener("load", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.querySelector("input#new_task");
        const input_trim = input.value.trim();
        input.value = "";

        if (input_trim !== "") {
            const sortableList = document.querySelector("section div.sortableList");

            const section_body = document.createElement("div");
            section_body.classList.add("task_list");
            section_body.draggable = true;

            sortableList.appendChild(section_body);

            const content = document.createElement("div");
            content.classList.add("content");

            const button = document.createElement("div");
            button.classList.add("button_holder");

            section_body.appendChild(content);
            section_body.appendChild(button);

            const label = document.createElement("label");
            content.appendChild(label);

            const outer_div = document.createElement("div");
            outer_div.classList.add("outer");
            label.appendChild(outer_div);

            const checked = document.createElement("div");
            checked.classList.add("empty");
            outer_div.appendChild(checked);

            const assigned = document.createElement("div");
            assigned.classList.add("assigned");
            label.appendChild(assigned);

            const strikeout = document.createElement("div");
            strikeout.classList.add("none");
            assigned.appendChild(strikeout);

            const task_input = document.createElement('input');
            task_input.classList.add("task_required");
            task_input.setAttribute("readonly", "readonly");
            task_input.value = input_trim;
            task_input.type = 'task';
            assigned.appendChild(task_input);

            outer_div.addEventListener("click", function () {

                if(checked.classList.toggle("checked") === true){
                    strikeout.classList.add("strikeout");
                    task_input.style.color = "var(--grey)"
                }
                else{
                    strikeout.classList.remove("strikeout");
                    task_input.style.color = "var(--light)"
                }
            });

            const edit = document.createElement('button')
            edit.classList.add("edit");
            edit.innerText = 'Edit';

            const delete_task = document.createElement('button');
            delete_task.classList.add("delete");
            delete_task.innerText = 'Delete';

            button.appendChild(edit);
            button.appendChild(delete_task);

            edit.addEventListener("click", () => {
                if (edit.innerText.toLowerCase() === "edit") {
                    edit.innerText = "Save";
                    task_input.removeAttribute("readonly");
                    task_input.focus();
                }
                else {
                    edit.innerText = "Edit";
                    task_input.setAttribute("readonly", "readonly");
                }
            });

            delete_task.addEventListener("click", () => {
                sortableList.removeChild(section_body);
            });

            const items = document.querySelectorAll(".task_list");
            items.forEach(item => {
                item.addEventListener("dragstart", () => {
                    setTimeout(() => {section_body.classList.add("dragging")}, 0);
                });
                console.log("Successful");
                item.addEventListener("dragend", () => {
                    item.classList.remove("dragging");
                })
            })
            const initSortableList = (e) => {
                e.preventDefault();
                const draggingItem = sortableList.querySelector(".dragging");

                const siblings = [...sortableList.querySelectorAll(".task_list:not(.dragging)")];

                const nextSibling = siblings.find(sibling => {
                    return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
                });
                if (draggingItem && nextSibling) {
                    sortableList.insertBefore(draggingItem, nextSibling);
                }
            }
            sortableList.addEventListener("dragover", initSortableList);
            sortableList.addEventListener("dragenter", (e) => {e.preventDefault()});

        }
        else {
            console.log("Task not entered");
        }

    });
})
