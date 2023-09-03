
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

            section_body.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", ""); // Set some data, it can be empty
                setTimeout(() => {
                    section_body.classList.add("dragging");
                }, 0);
            });

            section_body.addEventListener("dragend", () => {
                section_body.classList.remove("dragging");
            });

            sortableList.addEventListener("dragover", (e) => {
                e.preventDefault();
                const draggingItem = document.querySelector(".dragging");

                if (!draggingItem) return;

                const afterElement = getDragAfterElement(sortableList, e.clientY);
                if (afterElement == null) {
                    sortableList.appendChild(draggingItem);
                } else {
                    sortableList.insertBefore(draggingItem, afterElement);
                }
            });
        }
        else {
            console.log("Task not entered");
        }
    });

});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".task_list:not(.dragging)")];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
